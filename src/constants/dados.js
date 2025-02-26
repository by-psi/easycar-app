export const json_ride = {
  ride_id: 1,
  passenger_user_id: 1,
  passenger_name: "João Silva",
  passenger_phone: "(31) 99999-9999",
  pickup_address: "Av. Álvaro Camargos, 2053 São João Batista",
  pickup_date: "2025-02-17",
  dropoff_address: "Rua Alcides Lins, 320 Venda Nova",
  status: "A",
  driver_user_id: 1,
  driver_name: "Ezequias Martins",
  latitude: "-19.827144132189964",
  longitude: "-43.98309707518033"
}

export const json_rides = [
  {
    ride_id: 2,
    passenger_user_id: 2,
    passenger_name: "Paulo César",
    passenger_phone: "(31) 99999-9999",
    pickup_address: "Rua dos Astecas, 2917 - Santa Mônica",
    pickup_date: "2025-02-16",
    dropoff_address: "R. Padre Pedro Pinto, 933 - Venda Nova",
    status: "P",
    driver_user_id: 1,
    driver_name: null,
    latitude: null,
    longitude: null
  },
  {
    ride_id: 3,
    passenger_user_id: 4,
    passenger_name: "José Carlos",
    passenger_phone: "(31) 99999-9999",
    pickup_address: "Av. Álvaro Camargo, 1000 São João Batista",
    pickup_date: "2025-02-16",
    dropoff_address: "São João Batista",
    status: "A",
    driver_user_id: 2,
    driver_name: "Fernando Assis",
    latitude: "-19.826145",
    longitude: "-43.980099"
  },
  {
    ride_id: 4,
    passenger_user_id: 3,
    passenger_name: "Marcio Antunes",
    passenger_phone: "(11) 99999-9999",
    pickup_address: "Av. Algusto dos Anjos, 710",
    pickup_date: "2025-02-17",
    dropoff_address: "Rio Branco",
    status: "F",
    driver_user_id: 2,
    driver_name: "Fernando Assis",
    latitude: "-19.826145",
    longitude: "-43.980099"
  },
]

export const json_drivers = [
  {
    driver_user_id: 2,
    driver_name: "Ezequias Martins",
    driver_phone: "(31) 98410-7540",
    driver_address: "Rua dos Comanches, 870 Santa Mônica",
    latitude: "-19.826145",
    longitude: "-43.980099"
  }
]
