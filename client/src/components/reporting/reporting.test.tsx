import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PassengerList from './index';
import { usePassengers } from '../../hooks/usePassengers';


const mockedUsePassengers = usePassengers as jest.Mock<any>; 
jest.mock('../../hooks/usePassengers');
describe('Testing Passenger List component', () => {
  beforeEach(() => {
    mockedUsePassengers.mockImplementation(() => ({
      isLoading: false,
      data: [{"id":55,"survived":0,"pclass":1,"name":"Ostby, Mr. Engelhart Cornelius","sex":"male","age":65}]
    }));
  });

  afterEach(() => {
		jest.clearAllMocks();
	});

  it('renders doughnut', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <PassengerList />
      </QueryClientProvider>
      );
    const passengerName = screen.getByText(/Survived/i);
    expect(passengerName).toBeInTheDocument();
  });
})
