package models

const Host = "localhost"
const Port = 5432
const User = "postgres"
const Password = "shiny"
const Dbname = "my_db"

type Passenger struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Src     string `json:"src"`
	Dest    string `json:"dest"`
	Airline string `json:"airline"`
	Phnum   string `json:"phnum"`
	Seatnum string `json:"seatnum"`
	Date    string `json:"date"`
}

type Flight struct {
	Flight_id int    `json:"flight_id"`
	Src       string `json:"src"`
	Dest      string `json:"dest"`
	Arr       string `json:"arr"`
	Dept      string `json:"dept"`
	Date      string `json:"date"`
	Airline   string `json:"airline"`
}
