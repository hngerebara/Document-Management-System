import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import { UsersPage } from '../../../../client/src/components/users/manageUsers/UsersPage';

const mockStore = configureMockStore();

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

  const initialState = {
    Auth: {
      user: {}
    },
    manageUsers
  };
  const props = {
    searchAllUsers: jest.fn(),
    deleteUser: jest.fn(),
    fetchAllUsers: jest.fn(),
    clearSearch: jest.fn(),
  };

  const store = mockStore(initialState);
  sinon.spy(UsersPage.prototype, 'componentDidMount');
  const wrapper = mount(
    <Provider store={store} >
       <UsersPage
         searchAllUsers={props.searchAllUsers}
         deleteUser={props.deleteUser}
         fetchAllUsers={props.fetchAllUsers}
         clearSearch={props.clearSearch}
         currentUser={props.currentUser}
         manageUsers={manageUsers}
     />
     </Provider>);

  return {
    props,
    wrapper
  };
};

describe('Userpage Component', () => {
  const { wrapper, props, manageUsers } = setup();
  describe('UsersPage', () => {
    it('renders the UsersPage component', () => {
      expect(wrapper.find('div').length).toEqual(10);
    });

    it('renders a main', () => {
      expect(wrapper.find('main').length).toEqual(1);
    });
    it('should render subcomponent UserList', () => {
      const UsersListProps = wrapper.find('UsersList').props();
      expect(UsersListProps.deleteUser).toEqual(props.deleteUser);
      expect(UsersListProps.manageUsers).toEqual(manageUsers);
    });

    it('calls componentDidMount', () => {
      expect(UsersPage.prototype.componentDidMount.calledOnce).toEqual(true);
      UsersPage.prototype.componentDidMount.restore();
    });
  });
});

