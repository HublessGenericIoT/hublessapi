#Explanation of data stored in the hubless system

## The Device

A device is composed of the following

|key        |type|location|
|---        |---|---|
|id         |uuid|dynamodb and awsiot|
|name       |String|DynamoDB|
|room       |String|DynamoDB|
|user       |Number|DynamoDB|
|type       |Enum(light)|DynamoDB|
|attributes |Map|DynamoDB|
|model      |String (e.g. ESP 8266)|AWS IoT|
