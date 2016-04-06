#Explanation of data stored in the hubless system

## The Device

A device is composed of the following

|key|type|location|
|---|---|---|
|id|uuid|dynamodb and awsiot|
|name|String|DynamoDB and awsiot|
|room|String|DynamoDB|
|user|Number|DynamoDB|
|type|Enum(light)|AWS
|attributes|Map|DynamoDB|
|model|String|AWS IoT|
