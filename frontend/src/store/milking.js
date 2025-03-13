import { create } from "zustand"

export const useMilkingSessionStore = create((set) => {
    return {
        milkingSessions: [],
        setMilkingSessions: (milkingSessions) => set({ milkingSessions }),
        createMilkingSessions: async (newMilkingSession) => {
            try {
                console.log("Payload Data", newMilkingSession)
                const response = await fetch( `${import.meta.env.VITE_API_BASE_URL}/v1/api/milking/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newMilkingSession),
                });
                if (!response.ok) throw new Error("Failed to create session");
                const data = await response.json();

                set((state) => ({ milkingSessions: [...state.milkingSessions, data.data] }));
                return {success: true, message: "Session created successfully"};
            } catch (error) {
                console.error("Error creating milking session:", error.message);
            }
        },
        getAllMilkingSession: async (page = 1) => { // Accept page number (default to 1)
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/v1/api/milking/get?page=${page}`, // Pass page as query param
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
        
                if (!response.ok) throw new Error("Failed to fetch milking sessions");
        
                const data = await response.json();
                console.log("API Response:", data);
        
                if (data.success && data.pagination) {
                    const { currentPage, totalPages, hasNextPage, hasPrevPage, data: sessionData } = data.pagination;
        
                    set({
                        milkingSessions: sessionData, // ✅ Store session data
                        currentPage,
                        totalPages,
                        hasNextPage,
                        hasPrevPage
                    });
        
                    return {
                        success: true,
                        data: sessionData,
                        currentPage,
                        totalPages,
                        hasNextPage,
                        hasPrevPage
                    };
                } else {
                    console.error("Invalid response format:", data);
                    set({ milkingSessions: [] });
                    return { success: false, message: "Invalid response format" };
                }
            } catch (error) {
                console.error("Error fetching milking sessions:", error.message);
                return { success: false, message: error.message };
            }
        }
        
        
    } 
});