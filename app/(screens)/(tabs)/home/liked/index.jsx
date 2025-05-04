import React, { useEffect, useState } from 'react';
import { 
  View,
  Text, 
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axiosInstance from '../../../../components/axiosInstance';
import { router } from 'expo-router';
import MoviesCard from '../../../../components/cards/MoviesCard/MoviesCard';
import { AntDesign } from '@expo/vector-icons';
import Dropdown from '../../../../components/Dropdown';

const LikedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        hasMorePages: false
    });

    const [filters, setFilters] = useState({
        genre: null,
        language: null,
        year: null,
        production: null
    });
    
    const [filterOptions, setFilterOptions] = useState({
        genres: [],
        languages: [],
        years: [],
        productions: []
    });

    const getMovies = async (page = 1, shouldAppend = false) => {
        try {
            if (page === 1) setLoading(true);
            
            const response = await axiosInstance.get(
                `${process.env.EXPO_PUBLIC_SERVER_URL}/userLiked?page=${page}&limit=12`
            );
            
            const newMovies = response.data.movies;
            
            if (shouldAppend) {
                setMovies(prevMovies => [...prevMovies, ...newMovies]);
            } else {
                setMovies(newMovies);
            }
            
            setPagination(response.data.pagination);
            
            if (page === 1) {
                updateFilterOptions(shouldAppend ? [...movies, ...newMovies] : newMovies);
            }
        } catch (err) {
            console.error('Beğenilen filmler alınırken hata:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const updateFilterOptions = (movies) => {
        const genresSet = new Set();
        const languagesSet = new Set();
        const yearsSet = new Set();
        const productionsSet = new Set();

        movies.forEach(movie => {
            if (movie.genres) {
                movie.genres.split(', ').forEach(genre => {
                    genresSet.add(genre);
                });
            }
            
            if (movie.language) {
                languagesSet.add(movie.language === 'en' ? 'İngilizce' : movie.language);
            }
            
            if (movie.release) {
                yearsSet.add(movie.release);
            }
            
            if (movie.productions && Array.isArray(movie.productions)) {
                movie.productions.forEach(prod => {
                    if (prod && prod.name) {
                        productionsSet.add(prod.name);
                    }
                });
            }
        });

        setFilterOptions({
            genres: Array.from(genresSet).sort(),
            languages: Array.from(languagesSet).sort(),
            years: Array.from(yearsSet).sort((a, b) => b - a),
            productions: Array.from(productionsSet).sort()
        });
    };


    const applyFilters = () => {
        let result = [...movies];
        
        if (filters.genre) {
            result = result.filter(movie => 
                movie.genres && movie.genres.includes(filters.genre)
            );
        }
        
        if (filters.language) {
            const langCode = filters.language === 'İngilizce' ? 'en' : filters.language;
            result = result.filter(movie => movie.language === langCode);
        }

        if (filters.year) {
            result = result.filter(movie => movie.release === filters.year);
        }
        
        if (filters.production) {
            result = result.filter(movie => 
                movie.productions && 
                Array.isArray(movie.productions) && 
                movie.productions.some(prod => prod && prod.name === filters.production)
            );
        }
        
        setFilteredMovies(result);
    };

    const clearAllFilters = () => {
        setFilters({
            genre: null,
            language: null,
            year: null,
            production: null
        });
    };

    useEffect(() => {
        applyFilters();
    }, [filters, movies]);

    useEffect(() => {
        getMovies();
    }, []);

    const handleRefresh = () => {
        if (!refreshing) {
            setRefreshing(true);
            setPagination(prev => ({ ...prev, currentPage: 1 }));
            getMovies(1, false);
        }
    };

    const handleLoadMore = () => {
        if (pagination.hasMorePages && !loading) {
            const nextPage = pagination.currentPage + 1;
            getMovies(nextPage, true);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(process.env.EXPO_PUBLIC_SERVER_URL + '/deleteLike', {
                data: {
                    mvId: id
                }
            });
            
            if (response.data && response.data.success) {
                setMovies(prevMovies => prevMovies.filter(movie => (movie.id || movie.mvId) !== id));
            }
            
            return response.data;
        } catch (err) {
            console.error('Film silinirken hata:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getActiveFilterCount = () => {
        return Object.values(filters).filter(value => value !== null).length;
    };

    if (!movies.length && loading) {
        return (
            <ActivityIndicator
                size='large'
                style={{flex: 1, alignSelf: 'center', backgroundColor: '#F2F3F4', width: '100%'}}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterButtonContainer}>
                <TouchableOpacity 
                    style={styles.filterButton}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <AntDesign name="filter" size={16} color="#fff" />
                    <Text style={styles.filterButtonText}>Filtrele</Text>
                    {getActiveFilterCount() > 0 && (
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {showFilters && (
                <View style={styles.filtersContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Dropdown 
                            options={filterOptions.genres}
                            selectedValue={filters.genre}
                            onValueChange={(value) => setFilters(prev => ({...prev, genre: value}))}
                            placeholder="Tür seç"
                            label="Film Türü"
                            containerStyle={styles.dropdown}
                        />
                        
                        <Dropdown 
                            options={filterOptions.languages}
                            selectedValue={filters.language}
                            onValueChange={(value) => setFilters(prev => ({...prev, language: value}))}
                            placeholder="Dil seç"
                            label="Dil"
                            containerStyle={styles.dropdown}
                        />
                        
                        <Dropdown 
                            options={filterOptions.years}
                            selectedValue={filters.year}
                            onValueChange={(value) => setFilters(prev => ({...prev, year: value}))}
                            placeholder="Yıl seç"
                            label="Çıkış Yılı"
                            containerStyle={styles.dropdown}
                        />
                        
                        <Dropdown 
                            options={filterOptions.productions}
                            selectedValue={filters.production}
                            onValueChange={(value) => setFilters(prev => ({...prev, production: value}))}
                            placeholder="Yapımcı seç"
                            label="Yapım Şirketi"
                            containerStyle={styles.dropdown}
                        />
                    </ScrollView>
                    
                    {getActiveFilterCount() > 0 && (
                        <TouchableOpacity 
                            style={styles.clearFiltersButton}
                            onPress={clearAllFilters}
                        >
                            <Text style={styles.clearFiltersText}>Filtreleri Temizle</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {getActiveFilterCount() > 0 && (
                <View style={styles.resultInfoContainer}>
                    <Text style={styles.resultInfoText}>
                        {filteredMovies.length} film bulundu
                    </Text>
                </View>
            )}

            <View style={{
                flex: 1,
                marginHorizontal: 5,
                paddingHorizontal: 5,
                backgroundColor: '#F2F3F4',
            }}>
                <MoviesCard 
                    data={getActiveFilterCount() > 0 ? filteredMovies : movies}
                    onLongPress={true}
                    onDelete={handleDelete}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    onEndReached={getActiveFilterCount() > 0 ? null : handleLoadMore}
                    loading={loading}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F3F4',
    },
    filterButtonContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#213555',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: '500',
        marginLeft: 5,
    },
    filterBadge: {
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    filterBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    filtersContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    dropdown: {
        width: 160,
        marginRight: 10,
    },
    clearFiltersButton: {
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
    },
    clearFiltersText: {
        color: '#FF6B6B',
        fontWeight: '500',
    },
    resultInfoContainer: {
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    resultInfoText: {
        color: '#213555',
        fontWeight: '500',
    },
});

export default LikedMovies;