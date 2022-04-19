import * as services from '../services';

export const getPassengers = (async (req, res, next) => {
    try {
        const passengers = await services.getPassengers();
        
        // Adding a Sleep on purpose to add some latency on the Frontend
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        res.json(passengers);
    } catch (error) {
        next(error);
    }
    
});

export const feedData = (async (req, res, next) => {
    try {
        await services.feedData();
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});