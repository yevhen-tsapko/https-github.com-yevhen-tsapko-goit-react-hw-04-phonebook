import PropTypes from 'prop-types';
import { DeleteButton } from './ContactList.styled';
export const ContactList = ({ contList, removeContact }) => (
  <ul>
    {contList.map(({ name, number, id }) => (
      <li key={id}>
        {name}: {number}
        <DeleteButton
          type="button"
          data-id={id}
          onClick={evt => {
            removeContact(evt.currentTarget.dataset.id);
          }}
        >
          Delete
        </DeleteButton>
      </li>
    ))}
  </ul>
);
ContactList.propTypes = {
  contList: PropTypes.array,
  removeContact: PropTypes.func.isRequired,
};
