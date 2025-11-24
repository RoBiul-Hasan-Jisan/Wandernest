import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Calendar, MapPin, Users, ArrowRight, Plus, Trash2, Eye, Clock, DollarSign } from 'lucide-react';

// Import your actual trip data
import tripData from '../../data/tripData.json';

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use your actual trip data
  useEffect(() => {
    // Simulate API call loading
    setTimeout(() => {
      const tripsArray = Object.values(tripData.tripsData).map(trip => ({
        id: trip.id,
        title: trip.name,
        destination: `${trip.name}, ${trip.country}`,
        startDate: new Date(trip.id).toISOString().split('T')[0],
        endDate: new Date(trip.id + (parseInt(trip.duration) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        travelers: trip.travelers,
        duration: trip.duration,
        status: getTripStatus(trip.id),
        budget: trip.budget?.breakdown?.midRange?.total || 0,
        country: trip.country,
        description: trip.description,
        image: getDestinationImage(trip.name)
      }));
      setTrips(tripsArray);
      setLoading(false);
    }, 1000);
  }, []);

  // Helper function to determine trip status based on dates
  const getTripStatus = (tripId) => {
    const tripDate = new Date(tripId);
    const now = new Date();
    const daysDiff = (tripDate - now) / (1000 * 60 * 60 * 24);
    
    if (daysDiff < 0) return 'completed';
    if (daysDiff <= 30) return 'in-progress';
    return 'planned';
  };

  // Helper function to get destination images
  const getDestinationImage = (destination) => {
    const images = {
      'Chicago': '/api/placeholder/400/200?text=Chicago',
      'Santorini': '/api/placeholder/400/200?text=Santorini',
      'Bali': '/api/placeholder/400/200?text=Bali',
      'Kyoto': '/api/placeholder/400/200?text=Kyoto',
      'Paris': '/api/placeholder/400/200?text=Paris',
      'Istanbul': '/api/placeholder/400/200?text=Istanbul'
    };
    return images[destination] || '/api/placeholder/400/200';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned': return 'bg-blue-500';
      case 'in-progress': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'planned': return 'Planned';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-slate-300 mt-4">Loading your trips...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">My Trips</h1>
          <p className="text-slate-300 text-lg mb-8">Manage and view all your created trips</p>
          
          <a href="/create-trip">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              <Plus className="h-5 w-5 mr-2" />
              Create New Trip
            </Button>
          </a>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 rounded-2xl p-12 border border-slate-700/50 backdrop-blur-sm max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🧳</div>
              <h3 className="text-2xl font-bold text-white mb-4">No trips yet</h3>
              <p className="text-slate-400 mb-8">Start planning your next adventure by creating your first trip!</p>
              <a href="/create-trip">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Trip
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                {/* Card Header */}
                <div className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(trip.status)}`}>
                      {getStatusText(trip.status)}
                    </span>
                    <div className="flex gap-2">
                      <button className="h-8 w-8 p-0 text-slate-400 hover:text-cyan-400 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{trip.title}</h3>
                  <p className="text-slate-400 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    {trip.destination}
                  </p>
                </div>

                {/* Card Content */}
                <div className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{trip.travelers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <DollarSign className="h-4 w-4" />
                      <span>Budget: {formatCurrency(trip.budget)}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-3 line-clamp-2">
                    {trip.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex gap-2">
                  <a href={`/view-trip/${trip.id}`} className="flex-1">
                    <Button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                  <a href={`/ai-suggestion?destination=${encodeURIComponent(trip.destination)}`}>
                    <Button variant="outline" className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      AI Tips
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {trips.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">{trips.length}</div>
              <div className="text-slate-300">Total Trips</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {trips.filter(trip => trip.status === 'completed').length}
              </div>
              <div className="text-slate-300">Completed</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {trips.filter(trip => trip.status === 'planned').length}
              </div>
              <div className="text-slate-300">Upcoming</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">
                {trips.filter(trip => trip.status === 'in-progress').length}
              </div>
              <div className="text-slate-300">In Progress</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {trips.length > 0 && (
          <div className="mt-12 bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/create-trip" className="block">
                <div className="bg-slate-700/50 hover:bg-slate-600/50 rounded-xl p-4 text-center transition-all duration-300 border border-slate-600/50 hover:border-cyan-500/50">
                  <Plus className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Create New Trip</div>
                </div>
              </a>
              <a href="/ai-suggestion" className="block">
                <div className="bg-slate-700/50 hover:bg-slate-600/50 rounded-xl p-4 text-center transition-all duration-300 border border-slate-600/50 hover:border-blue-500/50">
                  <div className="h-8 w-8 text-blue-400 mx-auto mb-2">🤖</div>
                  <div className="text-white font-semibold">Get AI Suggestions</div>
                </div>
              </a>
              <a href="/user-manual" className="block">
                <div className="bg-slate-700/50 hover:bg-slate-600/50 rounded-xl p-4 text-center transition-all duration-300 border border-slate-600/50 hover:border-green-500/50">
                  <div className="h-8 w-8 text-green-400 mx-auto mb-2">📚</div>
                  <div className="text-white font-semibold">Travel Guide</div>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;