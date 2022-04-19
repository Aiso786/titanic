import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { usePassengers } from '../../hooks/usePassengers';
import { Passenger } from '../../models';
import Chart from '../chart';

type CharDataType = {
    name: string,
    value: number
};

const getSurvivedChartData = (passengers: Array<Passenger>) => [
    {
        name: "Survived",
        value: passengers.filter((x: Passenger) => x.survived === 1).length
    },
    {
        name: "Not survived",
        value: passengers.filter((x: Passenger) => x.survived === 0).length
    }
];

const getSexChartData = (passengers: Array<Passenger>) => [
    {
        name: "Male",
        value: passengers.filter((x: Passenger) => x.sex === 'male').length
    },
    {
        name: "Female",
        value: passengers.filter((x: Passenger) => x.sex === 'female').length
    }
];

const getPClassChartData = (passengers: Array<Passenger>) => [
    {
        name: "1",
        value: passengers.filter((x: Passenger) => x.pclass === 1).length
    },
    {
        name: "2",
        value: passengers.filter((x: Passenger) => x.pclass === 2).length
    },
    {
        name: "3",
        value: passengers.filter((x: Passenger) => x.pclass === 3).length
    }
];

const Reporting: React.FC = () => {
    const [chartData, setChartData] = useState<CharDataType[]>([]);
    const { isLoading, error, data } = usePassengers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>'An error has occurred'</div>;
    }

    if (!chartData.length) {
        setChartData(getSurvivedChartData(data));
    }
    return (
        <>
            <div>
                <Chart data={chartData} width={400} height={400} />
            </div>
            <div className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    onClick={() => setChartData(getSurvivedChartData(data))}>
                    Survived
                </Button>
                <Button
                    variant="success"
                    className='ms-3'
                    onClick={() => setChartData(getSexChartData(data))}>
                    Sex
                </Button>
                <Button
                    variant="warning"
                    className='ms-3'
                    onClick={() => setChartData(getPClassChartData(data))}>
                    Age
                </Button>
            </div>
        </>
    );
}

export default Reporting;