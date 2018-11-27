import * as actionTypes from '../actions/actionTypes';

const loadAlbums = url => {
  return [
    {
      userId: 1,
      id: 1,
      title: 'quidem molestiae enim',
      photo: [
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796',
        },
        {
          albumId: 1,
          id: 3,
          title: 'officia porro iure quia iusto qui ipsa ut modi',
          url: 'https://via.placeholder.com/600/24f355',
          thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        },
      ],
    },
    {
      userId: 1,
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
      photo: [
        {
          albumId: 2,
          id: 51,
          title: 'non sunt voluptatem placeat consequuntur rem incidunt',
          url: 'https://via.placeholder.com/600/8e973b',
          thumbnailUrl: 'https://via.placeholder.com/150/8e973b',
        },
        {
          albumId: 2,
          id: 52,
          title: 'eveniet pariatur quia nobis reiciendis laboriosam ea',
          url: 'https://via.placeholder.com/600/121fa4',
          thumbnailUrl: 'https://via.placeholder.com/150/121fa4',
        },
        {
          albumId: 2,
          id: 53,
          title: 'soluta et harum aliquid officiis ab omnis consequatur',
          url: 'https://via.placeholder.com/600/6efc5f',
          thumbnailUrl: 'https://via.placeholder.com/150/6efc5f',
        },
      ],
    },
    {
      userId: 1,
      id: 3,
      title: 'omnis laborum odio',
      photo: [
        {
          albumId: 3,
          id: 101,
          title: 'incidunt alias vel enim',
          url: 'https://via.placeholder.com/600/e743b',
          thumbnailUrl: 'https://via.placeholder.com/150/e743b',
        },
        {
          albumId: 3,
          id: 102,
          title: 'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
          url: 'https://via.placeholder.com/600/a393af',
          thumbnailUrl: 'https://via.placeholder.com/150/a393af',
        },
        {
          albumId: 3,
          id: 103,
          title: 'et eius nisi in ut reprehenderit labore eum',
          url: 'https://via.placeholder.com/600/35cedf',
          thumbnailUrl: 'https://via.placeholder.com/150/35cedf',
        },
      ],
    },
    {
      userId: 1,
      id: 4,
      title: 'non esse culpa molestiae omnis sed optio',
      photo: [
        {
          albumId: 4,
          id: 151,
          title: 'possimus dolor minima provident ipsam',
          url: 'https://via.placeholder.com/600/1d2ad4',
          thumbnailUrl: 'https://via.placeholder.com/150/1d2ad4',
        },
        {
          albumId: 4,
          id: 152,
          title: 'et accusantium enim pariatur eum nihil fugit',
          url: 'https://via.placeholder.com/600/a01c5b',
          thumbnailUrl: 'https://via.placeholder.com/150/a01c5b',
        },
        {
          albumId: 4,
          id: 153,
          title: 'eum laborum in sunt ea',
          url: 'https://via.placeholder.com/600/9da52c',
          thumbnailUrl: 'https://via.placeholder.com/150/9da52c',
        },
        {
          albumId: 4,
          id: 154,
          title: 'dolorum ipsam odit',
          url: 'https://via.placeholder.com/600/7f330f',
          thumbnailUrl: 'https://via.placeholder.com/150/7f330f',
        },
        {
          albumId: 4,
          id: 155,
          title: 'dolorum ipsam odit',
          url: 'https://via.placeholder.com/600/7f330f',
          thumbnailUrl: 'https://via.placeholder.com/150/7f330f',
        },
      ],
    },
    {
      userId: 1,
      id: 5,
      title: 'eaque aut omnis a',
      photo: [
        {
          albumId: 5,
          id: 201,
          title: 'nesciunt dolorum consequatur ullam tempore accusamus debitis sit',
          url: 'https://via.placeholder.com/600/250289',
          thumbnailUrl: 'https://via.placeholder.com/150/250289',
        },
        {
          albumId: 5,
          id: 202,
          title: 'explicabo vel omnis corporis debitis qui qui',
          url: 'https://via.placeholder.com/600/6a0f83',
          thumbnailUrl: 'https://via.placeholder.com/150/6a0f83',
        },
        {
          albumId: 5,
          id: 203,
          title: 'labore vel voluptate ipsum quaerat debitis velit',
          url: 'https://via.placeholder.com/600/3a5c29',
          thumbnailUrl: 'https://via.placeholder.com/150/3a5c29',
        },
      ],
    },
    {
      userId: 1,
      id: 6,
      title: 'natus impedit quibusdam illo est',
      photo: [
        {
          albumId: 6,
          id: 251,
          title: 'voluptatibus nihil a',
          url: 'https://via.placeholder.com/600/afc5c2',
          thumbnailUrl: 'https://via.placeholder.com/150/afc5c2',
        },
        {
          albumId: 6,
          id: 252,
          title: 'est quisquam ducimus excepturi optio rem sit',
          url: 'https://via.placeholder.com/600/1dc050',
          thumbnailUrl: 'https://via.placeholder.com/150/1dc050',
        },
      ],
    },
  ];
};

const initialState = {
  dataAlbums: loadAlbums('https://jsonplaceholder.typicode.com/albums/'),
  modal: {
    status: false,
    id: null,
  },
};

const showModal = (state, action) => {
  return { ...state, modal: { status: true, id: action.payload } };
};

const hideModal = (state, action) => {
  return { ...state, modal: { status: false, id: null } };
};

const changeAlbumTitle = (state, action) => {
  let newDataAlbums = state.dataAlbums.map(album => {
    if (album.id === +action.payload.id) {
      album.title = action.payload.title;
    }
    return album;
  });
  return { ...state, dataAlbums: newDataAlbums };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return showModal(state, action);
    case actionTypes.HIDE_MODAL:
      return hideModal(state, action);
    case actionTypes.CHANGE_TITLE_ALBUM:
      return changeAlbumTitle(state, action);
    default:
      return state;
  }
};

export default reducer;
