import PropTypes from 'prop-types';
import { Form, Field, Input, SubmitButton } from './ContactForm.styled';
export const ContactForm = ({ createContactData }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    createContactData(evt.currentTarget.elements);
    evt.currentTarget.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        {' '}
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Field>
      <Field>
        {' '}
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Field>{' '}
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
};
ContactForm.prototype = {
  createContactData: PropTypes.func.isRequired,
};
