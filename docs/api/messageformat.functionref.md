---
title: "FunctionRef"
parent: "messageformat"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# FunctionRef interface

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

To resolve a FunctionRef, an externally defined function is called.

**Signature:**

```typescript
export interface FunctionRef 
```

## Remarks

The `name` identifies a function that takes in the arguments `args`<!-- -->, the current locale, as well as any `options`<!-- -->, and returns some corresponding output. Likely functions available by default would include `'plural'` for determining the plural category of a numeric value, as well as `'number'` and `'date'` for formatting values.

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [kind](./messageformat.functionref.kind.md) |  | 'open' \| 'close' \| 'value' | **_(BETA)_** |
|  [name](./messageformat.functionref.name.md) |  | string | **_(BETA)_** |
|  [operand?](./messageformat.functionref.operand.md) |  | [Literal](./messageformat.literal.md) \| [VariableRef](./messageformat.variableref.md) | **_(BETA)_** _(Optional)_ |
|  [options?](./messageformat.functionref.options.md) |  | [Option](./messageformat.option.md)<!-- -->\[\] | **_(BETA)_** _(Optional)_ |
|  [type](./messageformat.functionref.type.md) |  | 'function' | **_(BETA)_** |

