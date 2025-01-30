import { create } from 'zustand';

export const useCarStore = create((set) => ({
    cars: [],
    isLoading: false,
    error: null,

    setCars: (cars) => set({ cars }),

    createCar: async (newCar) => {
        if (!newCar.name || !newCar.image || !newCar.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            set({ isLoading: true, error: null });

            const res = await fetch("http://localhost:8000/api/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCar),
            });

            if (!res.ok) throw new Error("Failed to create car.");

            const data = await res.json();
            set((state) => ({ cars: [...state.cars, data.data], isLoading: false }));
            return { success: true, message: "Car created successfully." };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },

    fetchCars: async () => {
        try {
            set({ isLoading: true, error: null });

            const res = await fetch("http://localhost:8000/api/cars");
            if (!res.ok) throw new Error("Failed to fetch cars.");

            const data = await res.json();
            set({ cars: data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    deleteCar: async (pid) => {
        try {
            set({ isLoading: true, error: null });

            const res = await fetch(`http://localhost:8000/api/cars/${pid}`, { method: "DELETE" });
            const data = await res.json();

            if (!data.success) throw new Error(data.message);

            set((state) => ({
                cars: state.cars.filter((car) => car._id !== pid),
                isLoading: false
            }));

            return { success: true, message: "Car deleted successfully." };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },

    updateCar: async (pid, updatedCar) => {
        try {
            set({ isLoading: true, error: null });

            const res = await fetch(`http://localhost:8000/api/cars/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCar),
            });

            if (!res.ok) throw new Error("Failed to update car.");

            const data = await res.json();
            set((state) => ({
                cars: state.cars.map((car) => (car._id === pid ? data.data : car)),
                isLoading: false
            }));

            return { success: true, message: "Car updated successfully." };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
}));
