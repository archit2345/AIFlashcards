'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { CircularProgress, Typography, Container, Box } from "@mui/material"

const ResultPage = ()=> {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                setError("Missing session ID.");
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`);
                const sessionData = await res.json();
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            }
            catch (error) {
                setError("An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return(
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt:20}}>
                <CircularProgress/>
                <Typography variant="h6">Loading . . .</Typography>
            </Container>
        );
    }
    
    if (error) {
        return(
            <Container maxWidth="100vw" sx={{textAlign: 'center', mt:20}}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="100vw" sx={{textAlign: 'center', mt:4}}>   
            {session && session.payment_status === "paid" ? (
                <>
                    <Typography variant="h4">Thank you for purchasing.</Typography>
                    <Box sx={{mt:4}}>
                        <Typography variant="h6">Session ID: {session_id}</Typography>
                        <Typography variant="body1">
                            We have received your payment. You will receive an email soon with the purchase details.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">Payment Failed.</Typography>
                    <Box sx={{mt:4}}>
                        <Typography variant="h6">Session ID: {session_id}</Typography>
                        <Typography variant="body1">
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    );
}

export default ResultPage