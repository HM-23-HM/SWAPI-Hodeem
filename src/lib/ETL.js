import DataService from './DataService'

/** This function is used to remove the unecessary fields from the original object returned by the SWAPI API. 
 * @param {object} unalteredResponse    Unaltered response from the SWAPI API
 * @return {Array}                      Data which has been filtered for each character's `name`[string], 
 *                                      `gender`[string], `species`(endpoint[string]), `homeworld` (endpoint[string]),
 *                                      `starships` (array of endpoints[string]) 
 *                                      and `vehicles` (array of endpoints[string])
*/
export const removeUnecessaryFields = (unalteredResponse) => {

    var transformedData = [];

    unalteredResponse.forEach((character) => {
        let entry = {};
        const { name, gender, species, homeworld, vehicles, starships } = character;
        entry = { name, gender, species, homeworld, vehicles, starships };
        transformedData.push(entry)
    });

    return transformedData;
};

/** This function retrieves the value for each character's `homeworld` from the SWAPI API and replaces the existing
 * endpoint with the response from the SWAPI API.
 * @param {Array} transformedData       This is the transformed data which has yet to receive the `homeworld` values
 *                                      for each character.
 * @return {Promise}                    The transformed data with each character's `homeworld` value set.
  */
export const getHomeworlds = async (transformedData) => {

    let homeworldNames = [];

    for (let i = 0; i < transformedData.length; i++){
        let homeEndpoint = transformedData[i].homeworld;

        let response = await DataService.getMissingData(homeEndpoint);
        let nameOfHomeworld = response.data.name;
        homeworldNames.push(nameOfHomeworld)
    }

    for (let i = 0; i < transformedData.length ; i++){
        transformedData[i].homeworld = homeworldNames[i];
    }

    return transformedData;

};

/** This function retrieves the value for each character's `species` from the SWAPI API and replaces the existing
 * endpoint with the response from the SWAPI API.
 * @param {Array} transformedData       This is the transformed data which has yet to receive the `species` values
 *                                      for each character.
 * @return {Promise}                    The transformed data with each character's `species` value set.
 */
export const getSpecies = async (transformedData) => {

    let speciesNames = [];

    for (let i = 0; i < transformedData.length; i++){
        let speciesEndpoint = transformedData[i].species;

        if (speciesEndpoint.length === 0) {
            speciesNames.push('Human');
            continue;
        }

        let response = await DataService.getMissingData(speciesEndpoint);
        let nameOfSpecies = response.data.name;
        speciesNames.push(nameOfSpecies);
    }

    for (let i = 0; i < transformedData.length; i++){
        transformedData[i].species = speciesNames[i];
    }

    return transformedData;
};

/** This function retrieves the values for each character's `starships` from the SWAPI API and replaces the existing
 * array of endpoints with an array of the names of each starship.
 * @param {Array} transformedData       This is the transformed data which has yet to receive the array of starship 
 *                                      names.
 * @return {Promise}                    The transformed data with each character's `starships` value set.
 */
export const getStarships = async (transformedData) => {

    let combinedResults = [];

    for (let i = 0; i < transformedData.length; i++) {

        let initialStarshipNames = [];

        let starshipEndpoints = transformedData[i].starships;

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

    for (let i = 0; i < transformedData.length; i++) {
        transformedData[i].starships = combinedResults[i];
    }

    return transformedData;
}

/** This function retrieves the values for each character's `vehicles` from the SWAPI API and replaces the existing
 * array of endpoints with an array of the names of each Vehicle.
 * @param {Array} relevantData          This is the transformed data which has yet to receive the array of vehicle 
 *                                      names.
 * @return {Promise}                    The transformed data with each character's `vehicles` value set.
 */
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


