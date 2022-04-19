import { useQuery } from "react-query";
import { Passenger } from "../models";

export const usePassengers = () => {
    return useQuery<Passenger[], Error>(["passengersList"], () =>
        fetch('http://localhost:5000/api/passengers').then(res =>
        res.json()
    )
)};
