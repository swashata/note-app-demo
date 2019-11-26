import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import uuid4 from 'uuid/v4';

const initialNotes = [
  {
    id: uuid4(),
    title: 'Sample Note',
    note: `## Est relatu rigore facitis montibus bibulis

Primos committere placet ille unda scires vicem pariturae ex rapiare quater
violabere fulva patruelibus, carmen florentis culpa. Maenaliosque quoque sulcis
curalium in palude flumineis texere, in inicit frondes. Tollite equam, infuso in
erat iugulo turba. Dat adsere non, in cum longeque ergo.

1. Est fatebor unica
2. Non est umerique vise una
3. Non nomen in quem umbra
4. Pavonibus capiebat tormentis pugnare et faciem
5. Portis Tarentum viro
6. Respicit puerpera quicquid divesque defendere in foret`,
  },
  {
    id: uuid4(),
    title: 'Another Note',
    note: `## Vidisti tamen

      Inpositum habet deam, aeacides marisque aures, suco missus, tum qui seque. Unum
      cui quas possis est orant inpulerat ensem, tactusque vibrata tormento linguas.
      Digna exanimi suis perdere, tandem constantia abest tulitquemuneris canentis;
      Gorgone pedes amens terrent. Nec iungere **voce**: dare **per** lanianda
      progeniem vocis Oresteae incumbensque grata et Dolona Saturnia bimembres fuit
      est viro. Postera tumulus caloris silices Damasicthona semel et mergit valetque
      litora Nasamoniaci moras latebris, terga dolores amores castique.`,
  },
];

export const getPosition = (haystack, id) =>
  haystack.findIndex(item => item.id === id);

export function useSetupNotesWithAuth(auth, db) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isMount = useRef();

  useEffect(() => {
    isMount.current = true;

    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (!auth.user) {
      setNotes([]);
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);

    // query firestore
    // await result or wait till promise resolves
    // once resolves, setNote to proper value
    // setLoading to false
    const userDataDoc = db.doc(`data/${auth.user.uid}`);
    const notesCollection = db.collection(`data/${auth.user.uid}/notes`);

    userDataDoc
      .get()
      .then(uDataSnapshot => {
        let dataInitialized = false;

        if (uDataSnapshot && uDataSnapshot.exists) {
          const uData = uDataSnapshot.data();
          if (uData && uData.initialized) {
            dataInitialized = true;
          }
        }

        if (dataInitialized) {
          return false;
        }

        const operations = [];
        initialNotes.forEach(n => {
          operations.push(
            notesCollection
              .doc(n.id)
              .set({
                title: n.title,
                note: n.note,
              })
              .catch(e => {
                if (isMount.current) {
                  setError(e);
                }
              })
          );
        });

        return Promise.all(operations);
      })
      .then(isInitialized => {
        if (isInitialized !== false) {
          return userDataDoc.set({
            initialized: true,
          });
        }
        return false;
      })
      .catch(e => {
        if (isMount.current) {
          setError(e);
        }
      })
      .finally(() => {
        if (isMount.current) {
          setLoading(false);
        }
      });

    // somehow, hook into notes subcollection change
    // if there's a change in subcollection, then update
    // notes state accordingly with setNotes
    const unsubscribe = notesCollection.onSnapshot(
      notes => {
        const notesInDb = [];
        notes.forEach(n => {
          const noteData = n.data();
          notesInDb.push({
            id: n.id,
            title: noteData.title,
            note: noteData.note,
          });
        });
        setNotes(notesInDb);
        setLoading(false);
      },
      err => {
        setLoading(false);
        setError(err);
      }
    );

    // cleanup function
    return () => {
      setLoading(false);
      unsubscribe();
    };
  }, [auth, db]);

  // finally, create functionality to
  //  1. Add new note.
  //  2. Update existing note.
  //  3. Delete a note
  const dispatch = useCallback(
    action => {
      const collectionRef = db.collection(`data/${auth.user.uid}/notes`);
      setLoading(true);
      if (action.type === 'add' || action.type === 'update') {
        collectionRef
          .doc(action.payload.id)
          .set({
            title: action.payload.title,
            note: action.payload.note,
          })
          .catch(e => {
            setError(e);
          });
      } else if (action.type === 'delete') {
        collectionRef
          .doc(action.payload.id)
          .delete()
          .catch(e => {
            setError(e);
          });
      }
    },
    [auth, db]
  );

  // it should return the following things
  //  1. A State array of notes, just like before.
  //  2. A custom dispatch function with functionality just like useReducer
  //  3. State to mention whether in loading stage or not.
  //  4. Errors (if any).
  return [notes, dispatch, loading, error];
}

export const notesCtx = createContext();
export const noteDispatchCtx = createContext();
export const noteLoadingCtx = createContext();

export function useNotes() {
  return useContext(notesCtx);
}

export function useDispatch() {
  return useContext(noteDispatchCtx);
}
