"use client"
import { Card, CardContent, CardMedia, Grid, Typography, Container, CircularProgress, Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Product {
    _id: string
    title: string
    price: number
    imageCover: string
    ratingsAverage: number
    category?: { name: string }
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await axios.get<{ data: Product[] }>(
                    'https://ecommerce.routemisr.com/api/v1/products'
                )
                setProducts(data.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container sx={{ py: 4 }} maxWidth="xl">
            <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                Our Products
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardMedia
                                component="img"
                                image={product.imageCover}
                                alt={product.title}
                                sx={{ height: 260, objectFit: 'contain', bgcolor: '#f9f9f9', p: 2 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom variant="subtitle1" component="h3"
                                    sx={{
                                        fontWeight: '600', overflow: 'hidden',
                                        textOverflow: 'ellipsis', display: '-webkit-box',
                                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', minHeight: '48px'
                                    }}
                                >
                                    {product.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {product.category?.name}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Typography variant="h6" component="p" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                        {product.price} EGP
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {product.ratingsAverage}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}