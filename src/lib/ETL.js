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

export const getStarshipsAndVehicles = async (relevantData) => {

    let combinedPromises = [];

    relevantData.forEach((character) => {

        let promises_starshipNames = [];

        let starshipEndpoints = character.starships;

        if (starshipEndpoints.length === 0) {
            combinedPromises.push(Promise.resolve({ type: 'starship', value: [] }));
            return;
        }

        starshipEndpoints.forEach((endpoint) => {

            let promise = DataService.getMissingData(endpoint)
                .then(response => response.data.name);

            promises_starshipNames.push(promise);
        })

        combinedPromises.push(Promise.resolve({ type: 'starship', value: promises_starshipNames }));
    })

    relevantData.forEach((character) => {

        let promises_vehicleNames = [];

        let vehicleEndpoints = character.vehicles;

        if (vehicleEndpoints.length === 0) {
            combinedPromises.push(Promise.resolve({ type: 'vehicle', value: [] }));
            return;
        }

        vehicleEndpoints.forEach((endpoint) => {

            let promise = DataService.getMissingData(endpoint)
                .then(response => response.data.name)

            promises_vehicleNames.push(promise);

        })

        combinedPromises.push(Promise.resolve({ type: 'vehicle', value: promises_vehicleNames }));
    })

    let starshipNames = [];
    let vehicleNames = [];

    let finalPromise = await Promise.allSettled(combinedPromises)
        .then((promises) => {

            promises.forEach((promise) => {
                if (promise.value.type == 'starship') {
                    starshipNames.push(promise.value.value);
                } else {
                    vehicleNames.push(promise.value.value);
                }
            })

            for (let i = 0; i < relevantData.length; i++) {
                relevantData[i].starships = starshipNames[i];
                relevantData[i].vehicles = vehicleNames[i];
            }

            return relevantData;
        })
        .catch(err => console.log(err));

    return finalPromise;
};
