"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container,
    CircularProgress,
    Box,
    Grid
} from "@mui/material"

export default function BrandingPage() {

    const [brands, setBrands] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    async function getBrands() {

        try {

            let { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/brands"
            )

            setBrands(data.data)

        } catch (err) {

            console.log(err)

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {
        getBrands()
    }, [])

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh"
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return (

        <Container maxWidth="xl" sx={{ py: 4 }}>

            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                    textAlign: "center"
                }}
            >
                All Brands
            </Typography>

            <Grid container spacing={3}>

                {brands.map((brand: any) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={brand._id}
                    >

                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "0.3s",
                                cursor: "pointer",

                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 5
                                }
                            }}
                        >

                            <CardMedia
                                component="img"
                                image={brand.image}
                                alt={brand.name}
                                sx={{
                                    height: 220,
                                    objectFit: "contain",
                                    p: 2,
                                    bgcolor: "#fff"
                                }}
                            />

                            <CardContent
                                sx={{
                                    textAlign: "center",
                                    borderTop: "1px solid #eee"
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    {brand.name}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Container>
    )
}