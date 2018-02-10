package main

import (
    "fmt"
    "log"
    "os"
    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/dynamodb"
)


var (
    region = "us-east-2"
    output *dynamodb.ListTablesOutput
)


type Request struct {
    id int `json:"id"`
}


func init() {
    sess, err := session.NewSession(&aws.Config{Region: aws.String(region)})
    if err != nil {
        log.Print("Error getting session")
        log.Print(err)
        // this might not be good inside lambda function???
        os.Exit(2)
    }

    svc := dynamodb.New(sess)

    input := &dynamodb.ListTablesInput{}

    result, err := svc.ListTables(input)
    if err != nil {
        log.Print("Error listing tables")
        log.Print(err)
        os.Exit(2)
    }

    output = result
}


func Handler(request Request) ([]string, error) {
    log.Print("Running Deals...")
    log.Print(output)

    var names []string
    for _, pointer := range output.TableNames {
        fmt.Println(*pointer)
        names = append(names,*pointer)
    }
    return names, nil
}


func main() {
    lambda.Start(Handler)
}
