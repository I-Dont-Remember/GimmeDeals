# Madtown Deals site & API
Project to collect the regular deals in Madison, WI in one place rather than 
scattered on websites and chalkboards around the city.  

## Structure
Website is served from the free tier of Netlify, with the deals API running through AWS.  Specifically, 
API Gateway feeds to a Lambda function accessing DynamoDB for the deals.

## Setup
- Most important step is to install and configure the aws cli tool, since this project relies heavily 
on AWS services.
- The site is independent of the API code, so that is able to be hosted wherever you want so long as
you keep the API address up to date.  Many static hosting options exist, so that is left as an exercise for the reader.
- Since the website is hosted on a seperate domain from the API, CORS becomes an issue.  It must be enabled in the API Gateway,
but what is not documented in an obvious manner is that you must also add CORS headers to your Lambda function response as well.
- To setup this repo, one must first create a DynamoDB table using the provided script.
- Next, create a new Lambda function using the aws cli tool after building and zipping up the files:
```
aws lambda create-function --region <your region> --function-name <your func> \
--zip-file fileb://./deployment.zip --runtime go1.x \
--role arn:aws:iam::<id>:role/<your role> --handler main
```
  - From then on, the provided script can be used to build and update the Lambda function.  

- Lastly, an API Gateway must be created and set as the trigger of the Lambda function.

## Frontend Search + Filtering
- First iteration passes all items from database to client and lets JavaScript handle filtering deals for the user
- **Search**: First iteration inspiration from [w3schools](https://www.w3schools.com/howto/howto_js_filter_lists.asp), filters table rows as word is typed without using
any external libraries
  - ElasticSearch will probably be overkill.
- Considering that the number of deals is unlikely to break 1,000, is it more efficient/user-friendly to always allow the client to handle 
filtering of the deals based on the user choices instead of making querys to the server every time they want a new one?

### Sources/References
- Initial website template from https://templated.co
- host: https://www.netlify.com
- https://aws.amazon.com/blogs/compute/announcing-go-support-for-aws-lambda/
- https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/using-dynamodb-with-go-sdk.html
- http://www.blog.labouardy.com/serverless-golang-api-aws-lambda/
- And many more

