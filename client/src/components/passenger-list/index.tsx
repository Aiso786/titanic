import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Passenger } from '../../models';
import { usePassengers } from '../../hooks/usePassengers';

const getPassengersTable = (data: Array<Passenger>) => {
    const columns = [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'age',
        text: 'Age'
      }, {
        dataField: 'sex',
        text: 'Sex'
      }, {
        dataField: 'survived',
        text: 'Survived'
      }];
    return (
        <BootstrapTable
            keyField='id'
            data={ data }
            columns={ columns }
            pagination={ paginationFactory({}) } />
    );
}

const PassengerList: React.FC = () =>  {
    const { isLoading, error, data } = usePassengers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>'An error has occurred'</div>;
    }

    return (
        <div>
            {getPassengersTable(data as Array<Passenger>)}
        </div>
    );
}

export default PassengerList;