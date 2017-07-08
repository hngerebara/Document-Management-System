import React from 'react';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import UsersList from '../../../../client/src/components/admin/manageUsers/UsersList';
import { UsersPage } from '../../../../client/src/components/admin/manageUsers/UsersPage';

const setup = () => {
  const manageUsers = {
    users: [],
    isSearching: false,
    pagination: {},
    searchPagination: {},
    searchUsers: [],
    currentUser: {},
    searchQuery: ''
  };
  const props = {
    searchAllUsers: jest.fn(),
    deleteUser: jest.fn(),
    fetchAllUsers: jest.fn(),
    clearSearch: jest.fn(),
  };

  const wrapper = shallow(<UsersPage
    searchAllUsers={props.searchAllUsers}
    deleteUser={props.deleteUser}
    fetchAllUsers={props.fetchAllUsers}
    clearSearch={props.clearSearch}
    currentUser={props.currentUser}
    manageUsers={manageUsers}
  />);

  return {
    props,
    wrapper
  };
};

describe('Userpage Component', () => {
  const { wrapper, props, manageUsers } = setup();
  describe('UsersPage', () => {
    it('renders the UsersPage component', () => {
      expect(wrapper.find('div').length).toEqual(3);
    });

    it('renders a main', () => {
      expect(wrapper.find('main').length).toEqual(1);
    });
    it('should render subcomponent UserList', () => {
      const UsersListProps = wrapper.find('UsersList').props();
      expect(UsersListProps.deleteUser).toEqual(props.deleteUser);
      expect(UsersListProps.manageUsers).toEqual(manageUsers);
    });

    // it('calls componentDidMount', () => {
    //   sinon.spy(UsersPage.prototype, 'componentDidMount');
    //   expect(UsersPage.prototype.componentDidMount).to.have.property('callCount', 1);
    //   UsersPage.prototype.componentDidMount.restore();
    // });
  });
});

