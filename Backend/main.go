package main

import (
	"fmt"
	"log"
	"net/http"

	"./db"
	"./handler"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	DB := db.Init()
	h := handler.New(DB)
	router := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Origin"})
	methods := handlers.AllowedMethods([]string{"POST", "GET", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/passengers", h.GetAllData).Methods(http.MethodGet)
	// router.HandleFunc("/books/{id}", h.GetBook).Methods(http.MethodGet)
	router.HandleFunc("/passengers", h.SendData).Methods(http.MethodPost)
	// router.HandleFunc("/books/{id}", h.UpdateBook).Methods(http.MethodPut)
	router.HandleFunc("/passengers/{id}", h.DeleteData).Methods(http.MethodDelete)
	router.HandleFunc("/flight/{src}/{dest}/{date}", h.SearchFlight).Methods(http.MethodGet)

	fmt.Println("Starting server on the port 8000...")
	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(headers, methods, origins)(router)))
}
