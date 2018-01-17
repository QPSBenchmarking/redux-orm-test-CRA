import {attr, fk, many, Model, oneToOne} from "redux-orm";
import * as Constants from "./constants.js";

/**
 * Model with no relations
 */
export class ModelA extends Model {
    static modelName = "ModelA";

    static get fields() {
        return {
            id: attr(),
        };
    }

    static reducer(action, ModelA, session) {
        switch (action.type) {
            case Constants.CREATE_MODELA: {
                ModelA.create(action.payload);
                break;
            }
            case Constants.CREATE_MODELA: {
                for (let modelA of action.payload) {
                    ModelA.create(modelA);
                }
                break;
            }
        }
    }
}

/**
 * Model containing a realtion to Model A
 */
export class ModelB extends Model {
    static modelName = "ModelB";

    static get fields() {
        return {
            id: attr(),
            relation: many("ModelA", "ModelB"),
        };
    }

    static reducer(action, ModelB, session) {
        switch (action.type) {
            case Constants.CREATE_MODELB: {
                ModelB.create(action.payload);
                break;
            }
        }
    }
}

/**
 * Model that has a relation to a model that has a relation
 */
export class ModelC extends Model {
    static modelName = "ModelC";

    static get fields() {
        return {
            id: attr(),
            relation: many("ModelB", "ModelC"),
        };
    }

    static reducer(action, ModelC, session) {
        switch (action.type) {
            case Constants.CREATE_MODELC: {
                ModelB.create(action.payload);
                break;
            }
        }
    }
}