import DataService from './DataService'

export const removeUnecessaryFields = (rawData) => {

    var relevantData = [];

    rawData.forEach((character) => {
        let entry = {};
        const { name, gender, species, homeworld, vehicles, starships } = character;
        entry = { name, gender, species, homeworld, vehicles, starships };
        relevantData.push(entry)
    });

    return relevantData;
};

export const getHomeworld = async (relevantData) => {

    let homeworldPromises = [];

    relevantData.forEach((character) => {
        let homeEndpoint = character.homeworld;

        let promise = DataService.getMissingData(homeEndpoint)
            .then(response => response.data.name);

        homeworldPromises.push(promise);
    });

    let finalPromise = await Promise.allSettled(homeworldPromises)
        .then(results => {
            for (let i = 0; i < relevantData.length; i++) {
                relevantData[i].homeworld = results[i].value;
            };

            return relevantData;
        })

    return finalPromise;
};

export const getSpecies = (relevantData) => {

    let speciesPromises = [];

    relevantData.forEach((character) => {
        let speciesEndpoint = character.species;

        if (speciesEndpoint.length === 0) {
            speciesPromises.push(Promise.resolve('Human'));
            return;
        }

        let promise = DataService.getMissingData(speciesEndpoint)
            .then(response => response.data.name)

        speciesPromises.push(promise);
    });

    let finalPromise = Promise.allSettled(speciesPromises)
        .then(results => {
            for (let i = 0; i < relevantData.length; i++) {
                relevantData[i].species = results[i].value;
            };

            return relevantData;
        })

    return finalPromise;

};

export const getStarships = async (relevantData) => {

    let combinedResults = [];

    for (let i = 0; i < relevantData.length; i++) {

        let initialStarshipNames = [];

        let starshipEndpoints = relevantData[i].starships;

        if (starshipEndpoints.length === 0) {
            combinedResults.push([]);
            continue;
        }

        for (let i = 0; i < starshipEndpoints.length; i++) {
            let response = await DataService.getMissingData(starshipEndpoints[i]);
            let name = response.data.name;
            initialStarshipNames.push(name);
        }

        combinedResults.push(initialStarshipNames);
    }

    for (let i = 0; i < relevantData.length; i++) {
        relevantData[i].starships = combinedResults[i];
    }

    return relevantData;
}

export const getVehicles = async (relevantData) => {

    let combinedResults = [];

    for (let i = 0; i < relevantData.length; i++) {

        let initialVehicleNames = [];

        let vehicleEndpoints = relevantData[i].vehicles;

        if (vehicleEndpoints.length === 0) {
            combinedResults.push([]);
            continue;
        }

        for (let i = 0; i < vehicleEndpoints.length; i++) {
            let response = await DataService.getMissingData(vehicleEndpoints[i]);
            let name = response.data.name;
            initialVehicleNames.push(name);
        }

        combinedResults.push(initialVehicleNames);
    }

    for (let i = 0; i < relevantData.length; i++) {
        relevantData[i].vehicles = combinedResults[i];
    }

    return relevantData;
}


