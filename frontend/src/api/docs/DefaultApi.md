# DefaultApi

All URIs are relative to *http://localhost:5000/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | |
|[**authLogoutPost**](#authlogoutpost) | **POST** /auth/logout | |
|[**authMeGet**](#authmeget) | **GET** /auth/me | |
|[**authRefreshGet**](#authrefreshget) | **GET** /auth/refresh | |
|[**authResendVerificationEmailPost**](#authresendverificationemailpost) | **POST** /auth/resend-verification-email | |
|[**authSignupPost**](#authsignuppost) | **POST** /auth/signup | |
|[**authVerifyEmailGet**](#authverifyemailget) | **GET** /auth/verify-email | |
|[**usersCheckUsernameGet**](#userscheckusernameget) | **GET** /users/check-username | |
|[**usersIdGet**](#usersidget) | **GET** /users/{id} | |
|[**usersIdItinerariesGet**](#usersiditinerariesget) | **GET** /users/{id}/itineraries | |
|[**usersMeDelete**](#usersmedelete) | **DELETE** /users/me | |
|[**usersMePatch**](#usersmepatch) | **PATCH** /users/me | |

# **authLoginPost**
> LoginResponse authLoginPost()

Login a user

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    AuthLoginPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let authLoginPostRequest: AuthLoginPostRequest; // (optional)

const { status, data } = await apiInstance.authLoginPost(
    authLoginPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authLoginPostRequest** | **AuthLoginPostRequest**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User successfully logged in |  -  |
|**400** | Login failed |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogoutPost**
> ResponseMessage authLogoutPost()

Logout a user

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResponseMessage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User successfully logged in |  -  |
|**400** | Logout failed: No refresh token secret key. This is a problem with environment variable not being set on backend. |  -  |
|**401** | Logout failed: Invalid token type, This is a problem with an access token being attached as a \&#39;refreshToken\&#39;. |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authMeGet**
> LoginResponse authMeGet()

Get me

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authMeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully got self |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefreshGet**
> ResponseMessage authRefreshGet()

Refresh JWT

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authRefreshGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResponseMessage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully refreshed token |  -  |
|**400** | No refresh token secret key. This is a problem with environment variable not being set on backend. |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authResendVerificationEmailPost**
> ResponseMessage authResendVerificationEmailPost()

Resend verification email

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    AuthResendVerificationEmailPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let authResendVerificationEmailPostRequest: AuthResendVerificationEmailPostRequest; // (optional)

const { status, data } = await apiInstance.authResendVerificationEmailPost(
    authResendVerificationEmailPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authResendVerificationEmailPostRequest** | **AuthResendVerificationEmailPostRequest**|  | |


### Return type

**ResponseMessage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Verification email resent. The email is only sent in the case that the email exists and is pending verification. If the email does not exist or is already verified, no email is sent. Response message are same in all cases. |  -  |
|**400** | Error in sending email |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authSignupPost**
> ResponseMessage authSignupPost()

Signup a user

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    AuthSignupPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let authSignupPostRequest: AuthSignupPostRequest; // (optional)

const { status, data } = await apiInstance.authSignupPost(
    authSignupPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authSignupPostRequest** | **AuthSignupPostRequest**|  | |


### Return type

**ResponseMessage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | User created, check email to complete signup |  -  |
|**400** | Signup failed |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authVerifyEmailGet**
> ResponseMessage authVerifyEmailGet()

Verify email

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.authVerifyEmailGet(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


### Return type

**ResponseMessage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Email successfully verified |  -  |
|**404** | Invalid verification token provided |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersCheckUsernameGet**
> CheckUsernameResponse usersCheckUsernameGet()

Check if a username is available

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let username: string; //A username with letters, numbers, and underscores (default to undefined)

const { status, data } = await apiInstance.usersCheckUsernameGet(
    username
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] | A username with letters, numbers, and underscores | defaults to undefined|


### Return type

**CheckUsernameResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Username is available |  -  |
|**400** | Check-Username failed |  -  |
|**409** | Username taken, or already yours |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdGet**
> GetProfileResponse usersIdGet()

Get User Profile

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //User ID (default to undefined)

const { status, data } = await apiInstance.usersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User ID | defaults to undefined|


### Return type

**GetProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User profile retrieved |  -  |
|**400** | Error retrieving user profile |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdItinerariesGet**
> GetUserItinerariesResponse usersIdItinerariesGet()

Get the itineraries of a user

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //User ID (default to undefined)
let loadIndex: string; //A positive integer to specify which entries to retrieve for pagination (optional) (default to undefined)

const { status, data } = await apiInstance.usersIdItinerariesGet(
    id,
    loadIndex
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User ID | defaults to undefined|
| **loadIndex** | [**string**] | A positive integer to specify which entries to retrieve for pagination | (optional) defaults to undefined|


### Return type

**GetUserItinerariesResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Retrieved index N of user\&#39;s itineraries |  -  |
|**400** | Error fetching user\&#39;s itineraries |  -  |
|**403** | Cannot view user\&#39;s itineraries as their account is private |  -  |
|**404** | This user was not found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersMeDelete**
> UsersMeDelete200Response usersMeDelete()

Soft delete own account

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UsersMeDeleteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let usersMeDeleteRequest: UsersMeDeleteRequest; // (optional)

const { status, data } = await apiInstance.usersMeDelete(
    usersMeDeleteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **usersMeDeleteRequest** | **UsersMeDeleteRequest**|  | |


### Return type

**UsersMeDelete200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully (soft) deleted account |  -  |
|**400** | Error deleting account |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersMePatch**
> UsersMePatch200Response usersMePatch()

Update own profile

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UsersMePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let usersMePatchRequest: UsersMePatchRequest; // (optional)

const { status, data } = await apiInstance.usersMePatch(
    usersMePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **usersMePatchRequest** | **UsersMePatchRequest**|  | |


### Return type

**UsersMePatch200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully updated |  -  |
|**400** | Error in updating profile |  -  |
|**409** | Username already taken |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

