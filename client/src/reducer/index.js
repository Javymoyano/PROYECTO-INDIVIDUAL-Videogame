const {
  GET_VIDEOGAMES,
  ALPHABETICAL_FILTER,
  FILTER_RATING,
  FILTER_BY_GENRES,
  GET_VIDEOGAME_NAME,
  FILTER_BY_CREATED,
  GET_GENRES_VIDEOGAME,
  GET_PLATFORM_VIDEOGAME,
  VIDEOGAME_DETAILS,
  GET_CLEAN,
} = require("../action");

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_VIDEOGAME_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case ALPHABETICAL_FILTER:
      let sortedVideogame =
        action.payload === "az"
          ? state.videogames.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedVideogame,
      };
    // let all = state.videogames;
    // if (action.payload === "az")
    //   all.sort((a, b) => a.name.localeCompare(b.name));
    // if (action.payload === "za")
    //   all.sort((a, b) => b.name.localeCompare(a.name));
    // if (action.payload === "all") all = state.videogames;
    // return {
    //   ...state,
    //   videogames: [...all],
    // };
    // let sortedAlphetical = [...state.videogames];
    // sortedAlphetical =
    //   action.payload === "az"
    //     ? state.videogames.sort(function (a, b) {
    //         if (a.name > b.name) {
    //           return 1;
    //         }
    //         if (b.name > a.name) {
    //           return -1;
    //         }
    //         return 0;
    //       })
    //     : state.videogames.sort(function (a, b) {
    //         if (a.name > b.name) {
    //           return -1;
    //         }
    //         if (b.name > a.name) {
    //           return 1;
    //         }
    //         return 0;
    //       });
    // return {
    //   ...state,
    //   videogames: sortedAlphetical,
    //   allVideogames: action.payload,
    // };

    case FILTER_RATING:
      let orderByRating =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            });
      return {
        ...state,
        videogames: orderByRating,
      };
    // let filterRating = state.videogames;
    // filterRating = filterRating.sort((a, b) => {
    //   if (a.rating < b.rating) {
    //     return action.payload === "asc" ? 1 : -1;
    //   }
    //   if (a.rating > b.rating) {
    //     return action.payload === "asc" ? -1 : 1;
    //   }
    //   return 0;
    // });
    // return {
    //   ...state,
    //   videogames:
    //     action.payload === "Rating" ? state.allVideogames : filterRating,
    // };

    case GET_GENRES_VIDEOGAME:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORM_VIDEOGAME:
      return {
        ...state,
        platforms: action.payload,
      };

    case VIDEOGAME_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case FILTER_BY_GENRES:
      const allVideos = state.allVideogames;
      const filterGenres =
        action.payload === "Genres"
          ? allVideos
          : allVideos.filter((e) => e.genres.includes(action.payload));

      return {
        ...state,
        videogames: filterGenres,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case FILTER_BY_CREATED:
      //const allVideogames = [...state.allVideogames];

      const filterCreated =
        action.payload === "creados"
          ? state.allVideogames.filter((e) => e.createdInDb)
          : state.allVideogames.filter((e) => !e.createdInDb);
      if (filterCreated.length === 0) {
        return alert("Aún no hay Videogames creados");
      }
      return {
        ...state,
        videogames:
          action.payload === "all" ? state.allVideogames : filterCreated,
      };

    case GET_CLEAN:
      return {
        ...state,
        details: [],
      };
    default:
      return state;
  }
}

export default rootReducer;
