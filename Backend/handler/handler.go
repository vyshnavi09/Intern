package handler

import (
	"encoding/json"
	"fmt"

	// "io/ioutil"
	// "log"
	"net/http"

	"../models"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func New(db *gorm.DB) handler {
	return handler{db}
}

func GenerateUUID() uuid.UUID {
	id := uuid.New()

	return id
}

func (h handler) SendData(w http.ResponseWriter, r *http.Request) {
	// defer r.Body.Close()
	// body, err := ioutil.ReadAll(r.Body)

	// if err != nil {
	// 	log.Fatalln(err)
	// }

	// var passenger models.Passenger
	// json.Unmarshal(body, &passenger)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")
	var passenger models.Passenger
	_ = json.NewDecoder(r.Body).Decode(&passenger)

	// Append to the Passengers table
	passenger.ID = GenerateUUID().String()
	if result := h.DB.Create(&passenger); result.Error != nil {
		fmt.Println(result.Error)
	}

	// Send a 201 created response

	// w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Created")
}

func (h handler) GetAllData(w http.ResponseWriter, r *http.Request) {
	var passengers []models.Passenger

	if result := h.DB.Find(&passengers); result.Error != nil {
		fmt.Println(result.Error)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(passengers)
}

func (h handler) DeleteData(w http.ResponseWriter, r *http.Request) {
	// Read the dynamic id parameter
	vars := mux.Vars(r)
	id := vars["id"]

	var passenger models.Passenger

	if result := h.DB.First(&passenger, id); result.Error != nil {
		fmt.Println(result.Error)
	}

	h.DB.Delete(&passenger)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Deleted")
}

func (h handler) SearchFlight(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	var flights []models.Flight
	fmt.Println(vars)
	// date := time.vars["date"].String()
	fmt.Println(vars["src"])
	fmt.Println(vars["dest"])
	fmt.Println(vars["date"])
	if result := h.DB.Where("src = ? AND dest = ? AND date = ?", vars["src"], vars["dest"], vars["date"]).Find(&flights); result.Error != nil {
		fmt.Println(result.Error)
	}
	fmt.Println(flights)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(flights)
}
