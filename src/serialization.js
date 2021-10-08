import { Serializer, Deserializer } from 'jsonapi-serializer';

export const deserialize = async (data) => {
  const promise = new Promise((resolve, reject) => {
    new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (err, serialized) => {
      if (err) {
        reject(err);
      } else {
        resolve(serialized);
      }
    });
  });
  return promise;
};

export const serialize = (model, data) => {
  var serializer = new Serializer(model, {
    attributes: Object.keys(data),
  });
  return serializer.serialize(data);
};
