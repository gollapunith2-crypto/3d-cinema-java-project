import { create } from 'zustand';

const useBookingStore = create((set) => ({
  selectedMovie: null,
  selectedTheatre: null,
  selectedTime: null,
  selectedSeat: null,

  setMovie: (movie) => set({ selectedMovie: movie }),
  setTheatre: (theatre) => set({ selectedTheatre: theatre }),
  setTime: (time) => set({ selectedTime: time }),
  setSeat: (seat) => set({ selectedSeat: seat }),
  resetBooking: () =>
    set({ selectedMovie: null, selectedTheatre: null, selectedTime: null, selectedSeat: null }),
}));

export default useBookingStore;
