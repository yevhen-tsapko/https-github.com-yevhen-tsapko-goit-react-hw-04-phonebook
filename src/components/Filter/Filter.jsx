import PropTypes from 'prop-types';
import { Field, Input } from 'components/ContactForm/ContactForm.styled';
export const Filter = ({ handleFilterName }) => {
  return (
    <Field>
      {' '}
      Find contacts by name
      <Input type="text" onChange={handleFilterName} />
    </Field>
  );
};
Filter.propTypes = {
  handleFilterName: PropTypes.func.isRequired,
};
