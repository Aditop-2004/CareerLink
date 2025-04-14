import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setResumeAnalysis } from "../../redux/resumeAnalysisSlice";
import { RESUME_ANALYSIS_API_END_POINT } from "../../utils/constant";

export default function useGetResumeAnalysis() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileAndMaybeAnalyze = async () => {
      try {
        // 1. Get user profile
        const profileRes = await axios.get(
          "http://localhost:5000/api/v1/user/getProfile",
          { withCredentials: true }
        );

        const profile = profileRes.data?.user;
        const userId = profile?._id;
        const resumeUrl = profile?.profile?.resume;

        if (!userId || !resumeUrl) return;

        // 2. Check localStorage for last analyzed resume URL
        const lastAnalyzedResume = localStorage.getItem("lastAnalyzedResume");

        // 3. Trigger analysis only if resume URL changed
        if (resumeUrl !== lastAnalyzedResume) {
          const analysisRes = await axios.get(
            `${RESUME_ANALYSIS_API_END_POINT}/${userId}`,
            { withCredentials: true }
          );

          dispatch(setResumeAnalysis(analysisRes.data));

          // 4. Save new resume URL to localStorage
          localStorage.setItem("lastAnalyzedResume", resumeUrl);
        }
      } catch (error) {
        console.error("Error analyzing resume:", error);
      }
    };

    fetchProfileAndMaybeAnalyze();
  }, [dispatch]);
}
