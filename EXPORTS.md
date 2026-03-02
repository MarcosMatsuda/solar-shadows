# Package Exports Configuration

This document explains how the package exports are configured to work correctly in both React Web and React Native environments.

## Export Order

The order of conditions in `package.json` exports is **critical**:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "react-native": "./dist/index.js",  // ← Must come FIRST
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}
```

## Why Order Matters

Module resolution checks conditions **in order** and uses the **first match**:

### ❌ Wrong Order (Before Fix):
```json
{
  "types": "./dist/index.d.ts",
  "import": "./dist/index.mjs",      // ← React Native matches here
  "require": "./dist/index.js",      // ← and stops
  "react-native": "./dist/index.js"  // ← Never reached!
}
```

**Result**: React Native uses web version (`Shadow.tsx`) instead of native version (`Shadow.native.tsx`).

### ✅ Correct Order (After Fix):
```json
{
  "types": "./dist/index.d.ts",
  "react-native": "./dist/index.js",  // ← React Native matches here first
  "import": "./dist/index.mjs",       // ← Web ESM uses this
  "require": "./dist/index.js"        // ← Web CJS uses this
}
```

**Result**: React Native correctly resolves to native shadow implementation.

## How It Works

### React Native Resolution:
1. Checks `react-native` condition → **Matches!**
2. Uses `./dist/index.js`
3. Bundler (Metro) sees `Shadow.native.tsx` and uses it
4. Gets native shadow properties (iOS/Android)

### React Web (ESM):
1. Checks `react-native` condition → Doesn't match
2. Checks `import` condition → **Matches!**
3. Uses `./dist/index.mjs`
4. Gets `Shadow.tsx` with CSS box-shadow

### React Web (CJS):
1. Checks `react-native` condition → Doesn't match
2. Checks `import` condition → Doesn't match
3. Checks `require` condition → **Matches!**
4. Uses `./dist/index.js`
5. Gets `Shadow.tsx` with CSS box-shadow

## Testing

To verify the exports are working correctly:

### React Native:
```bash
# In a React Native project
npm install solar-shadows
# Should use Shadow.native.tsx automatically
```

### React Web:
```bash
# In a React web project
npm install solar-shadows
# Should use Shadow.tsx automatically
```

## References

- [Node.js Package Entry Points](https://nodejs.org/api/packages.html#package-entry-points)
- [React Native Package Exports](https://reactnative.dev/docs/package-exports)
