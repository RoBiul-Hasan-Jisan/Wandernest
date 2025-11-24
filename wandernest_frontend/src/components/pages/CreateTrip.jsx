import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, MapPin, Users, Plane, DollarSign, Clock, Plus, Minus } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "../../lib/utils";

function CreateTrip() {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: null,
    endDate: null,
    travelers: 1,
    budget: '',
    description: '',
    tripType: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const tripTypes = [
    'Beach Vacation',
    'Mountain Trekking',
    'City Exploration',
    'Road Trip',
    'Cultural Tour',
    'Business Trip',
    'Family Holiday',
    'Adventure Sports',
    'Luxury Getaway',
    'Backpacking'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTravelersChange = (change) => {
    const newValue = formData.travelers + change;
    if (newValue >= 1 && newValue <= 20) {
      setFormData(prev => ({
        ...prev,
        travelers: newValue
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Trip created:', formData);
      setLoading(false);
      // Redirect to My Trips or show success message
      window.location.href = '/my-trips';
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: <MapPin className="h-4 w-4" /> },
    { number: 2, title: 'Trip Details', icon: <Clock className="h-4 w-4" /> },
    { number: 3, title: 'Finalize', icon: <DollarSign className="h-4 w-4" /> }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Create New Trip</h1>
          <p className="text-slate-300 text-lg">Plan your perfect adventure with our easy trip builder</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-cyan-500 border-cyan-500 text-white' 
                    : 'border-slate-600 text-slate-400'
                } transition-all duration-300`}>
                  {step.icon}
                </div>
                <span className={`ml-3 font-semibold ${
                  currentStep >= step.number ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-8 ${
                    currentStep > step.number ? 'bg-cyan-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-white">
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Trip Details'}
              {currentStep === 3 && 'Finalize Your Trip'}
            </CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              {currentStep === 1 && 'Tell us about your trip destination'}
              {currentStep === 2 && 'Add dates and travel preferences'}
              {currentStep === 3 && 'Review and create your trip'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="title" className="text-slate-200">Trip Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Summer Beach Vacation"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="destination" className="text-slate-200">Destination *</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Bali, Indonesia"
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="tripType" className="text-slate-200">Trip Type</Label>
                    <Select onValueChange={(value) => handleInputChange('tripType', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600 text-white">
                        {tripTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-slate-200">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your trip plans, interests, and any special requirements..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-slate-200">Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-slate-700/50 border-slate-600 text-white",
                              !formData.startDate && "text-slate-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => handleInputChange('startDate', date)}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-slate-200">End Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-slate-700/50 border-slate-600 text-white",
                              !formData.endDate && "text-slate-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => handleInputChange('endDate', date)}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-slate-200">Number of Travelers</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleTravelersChange(-1)}
                        className="h-10 w-10 bg-slate-700/50 border-slate-600 text-white"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="text-white text-lg font-semibold min-w-8 text-center">
                        {formData.travelers}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleTravelersChange(1)}
                        className="h-10 w-10 bg-slate-700/50 border-slate-600 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-slate-400 ml-2">
                        {formData.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="budget" className="text-slate-200">Estimated Budget</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="0.00"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white pl-10 placeholder-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Card className="bg-slate-700/30 border-slate-600/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                          <span className="text-slate-300 font-semibold">Trip Title:</span>
                          <span className="text-white">{formData.title || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                          <span className="text-slate-300 font-semibold">Destination:</span>
                          <span className="text-white">{formData.destination || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                          <span className="text-slate-300 font-semibold">Trip Type:</span>
                          <span className="text-white">{formData.tripType || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                          <span className="text-slate-300 font-semibold">Dates:</span>
                          <span className="text-white">
                            {formData.startDate ? format(formData.startDate, "MMM dd, yyyy") : 'Not set'} - {formData.endDate ? format(formData.endDate, "MMM dd, yyyy") : 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-600/50 pb-3">
                          <span className="text-slate-300 font-semibold">Travelers:</span>
                          <span className="text-white">{formData.travelers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300 font-semibold">Budget:</span>
                          <span className="text-white">${formData.budget || '0'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Label htmlFor="final-description" className="text-slate-200">Additional Notes</Label>
                    <Textarea
                      id="final-description"
                      placeholder="Any last-minute details or special requests..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 disabled:opacity-50"
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Trip...
                      </>
                    ) : (
                      <>
                        <Plane className="h-4 w-4 mr-2" />
                        Create Trip
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreateTrip;