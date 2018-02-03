package main

import (
    "os"
    "fmt"
    "github.com/go-ini/ini"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/service/dynamodb"
)

var (
    aws_cred_file = os.Getenv("HOME") + "/.aws/credentials"
    id_string = "aws_access_key_id"
    key_string = "aws_secret_access_key"
    local_env = "LOCAL_DYNAMODB"
    region = "us-east-2"
)


func check(e error) {
    if e != nil {
        fmt.Printf("Error: %s\n", e)
        os.Exit(2)
    }
}


func getCredsFromFile() *credentials.Credentials {
    if _, err := os.Stat(aws_cred_file); os.IsNotExist(err) {
        fmt.Printf("%s does not exist\n", aws_cred_file)
        os.Exit(1)
    }

    file, err := ini.Load(aws_cred_file)
    check(err)

    profile, err := file.GetSection("default")
    check(err)

    id_string_key := profile.Key(id_string).String()
    key_string_key := profile.Key(key_string).String()
    return credentials.NewStaticCredentials(id_string_key,
                                            key_string_key, "")
}


func useAWS() *dynamodb.DynamoDB {
    fmt.Println("Using AWS DynamoDB connection...")
    creds := getCredsFromFile()
    sess, err := session.NewSession(&aws.Config{
                Region: aws.String(region),
                Credentials: creds,
                })
    check(err)

    return dynamodb.New(sess)
}


func useLocal() *dynamodb.DynamoDB {
    fmt.Println("Using local DynamoDB connection...")
    sess, err := session.NewSession(&aws.Config{Region: aws.String(region)})
    check(err)

    //backslash might be necessary https://stackoverflow.com/questions/33801460/dynamo-db-local-connection-refused#37106007
    return dynamodb.New(sess, aws.NewConfig().WithEndpoint("http://localhost:8000/"))
}


func main() {
    var svc *dynamodb.DynamoDB

    if os.Getenv(local_env) == "1" {
        svc = useLocal()
    } else {
        svc = useAWS()
    }

    input := &dynamodb.ListTablesInput{}

    result, err := svc.ListTables(input)
    if err != nil {
        fmt.Println(err.Error())
    }

    fmt.Println(result)

    t_input := &dynamodb.DescribeTableInput{
                    TableName: aws.String(*result.TableNames[0]),
            }

    t_result, err := svc.DescribeTable(t_input)
    if err != nil {
        fmt.Println(err.Error())
    }

    fmt.Println(t_result)
}
