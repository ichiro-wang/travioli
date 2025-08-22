# AuthSignupPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | A valid email address | [default to undefined]
**username** | **string** | A username with letters, numbers, and underscores | [default to undefined]
**password** | **string** | A password with minimum 8 characters | [default to undefined]
**confirmPassword** | **string** | A password with minimum 8 characters | [default to undefined]

## Example

```typescript
import { AuthSignupPostRequest } from './api';

const instance: AuthSignupPostRequest = {
    email,
    username,
    password,
    confirmPassword,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
