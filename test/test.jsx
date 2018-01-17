import {ORM} from "redux-orm";
import {createReducer} from "redux-orm";
import {createStore, combineReducers} from "redux";
import * as Constants from "../source/constants.js";

function prepareStore(Models) {
    let testORM = new ORM();

    let passMods = Object.values(Models);
    testORM.register(...passMods);

    let ormReducer = createReducer(testORM);
    let reducers  = combineReducers({
        orm: ormReducer,
    })

    let fakeStore = createStore(    // Error appears to occur here
        reducers,
        undefined,
        undefined,
    );
    return fakeStore;
}

import {ModelA, ModelB, ModelC} from "../source/models.jsx";

describe ("ORM Testing example", function() {
    it ("Creates a Test ModelA", function() {
        let fakeStore = prepareStore({ModelA});
        let testData = {
            id: 0,
        };

        let testAction1 = {
            type: Constants.CREATE_MODELA,
            payload: testData,
        };
        fakeStore.dispatch(testAction1);

        let ormState = fakeStore.getState().orm;
        expect(ormState.ModelA.itemsById["0"].id).to.equal(0);
        expect(ormState.ModelA.meta.maxId).to.equal(0);
    });

    it ("Creates a Test ModelB", function() {
        let fakeStore = prepareStore({ModelA, ModelB});
        let testData = {
            id: 0,
        };

        let testAction1 = {
            type: Constants.CREATE_MODELB,
            payload: testData,
        };
        fakeStore.dispatch(testAction1);

        let ormState = fakeStore.getState().orm;
        expect(ormState.ModelB.itemsById["0"].id).to.equal(0);
        expect(ormState.ModelB.meta.maxId).to.equal(0);
    });

    it ("Creates a Test ModelC", function() {
        let fakeStore = prepareStore({ModelA, ModelB, ModelC});
        let testData = {
            id: 0,
        };

        let testAction1 = {
            type: Constants.CREATE_MODELC,
            payload: testData,
        };
        fakeStore.dispatch(testAction1);

        let ormState = fakeStore.getState().orm;
        expect(ormState.ModelC.itemsById["0"].id).to.equal(0);
        expect(ormState.ModelC.meta.maxId).to.equal(0);
    });
});