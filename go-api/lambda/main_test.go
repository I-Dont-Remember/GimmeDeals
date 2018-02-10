package main

import (
    "fmt"
    "testing"
)


func TestHandler(t *testing.T) {
    ret, _ := Handler(Request{id:5,})
    fmt.Printf("TEST: ret = %s\n", ret)
    if ret[0] != "Deals" {
        t.Errorf("Expected 'Deals', got %s\n", ret[0])
    }
}
