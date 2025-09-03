# ItinerariesIdPatchRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**itineraryFields** | [**ItinerariesIdPatchRequestItineraryFields**](ItinerariesIdPatchRequestItineraryFields.md) |  | [optional] [default to undefined]
**updatedItems** | [**Array&lt;ItinerariesIdPatchRequestUpdatedItemsInner&gt;**](ItinerariesIdPatchRequestUpdatedItemsInner.md) |  | [optional] [default to undefined]
**newItems** | [**Array&lt;ItineraryItemInput&gt;**](ItineraryItemInput.md) |  | [optional] [default to undefined]
**deleteItemIds** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { ItinerariesIdPatchRequest } from './api';

const instance: ItinerariesIdPatchRequest = {
    itineraryFields,
    updatedItems,
    newItems,
    deleteItemIds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
