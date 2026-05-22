import Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true
});

export function validateSchema(
  schema: object,
  data: object
): void {

  const validate = ajv.compile(schema);

  const valid = validate(data);

  if (!valid) {
    throw new Error(
      JSON.stringify(validate.errors, null, 2)
    );
  }
}