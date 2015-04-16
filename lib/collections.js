/**
 * Separate collection definitions so they are not run twice via the .jsx source
 * files. Meteor will try to run them for both the jsx and compiled code, resulting
 * in an error. This is one way to resolve it, and good practice in general.
 */

Tasks = new Mongo.Collection("tasks");