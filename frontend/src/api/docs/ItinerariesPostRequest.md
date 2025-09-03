# ItinerariesPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**startDate** | [**ModelDate**](ModelDate.md) |  | [optional] [default to undefined]
**endDate** | [**ModelDate**](ModelDate.md) |  | [optional] [default to undefined]
**itineraryItems** | [**Array&lt;ItineraryItemInput&gt;**](ItineraryItemInput.md) |  | [default to undefined]

## Example

```typescript
import { ItinerariesPostRequest } from './api';

const instance: ItinerariesPostRequest = {
    title,
    description,
    startDate,
    endDate,
    itineraryItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
