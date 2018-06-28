export class Defaults {
    static emptySpot() {
        return {

            'identification': {
                'lat': '',
                'lon': '',
                'name': ''
            },
            'additionalInfo': {
                'crowd': {
                    'weekDays': 1,
                    'weekEnds': 1
                },
                'realLat': '',
                'realLon': '',
                'thumbsUp': 0,
                'thumbsDown': 0,
                'rank': 1
            },
            'swell': {
                'height': {
                    'min': 0,
                    'max': 0
                },
                'period': {
                    'min': 0,
                    'max': 0
                },
                'direction': {
                    'min': 0,
                    'max': 0
                },
                'compassDirection': []
            },
            'wind': {
                'speed': {
                    'min': 0,
                    'max': 0
                },
                'direction': {
                    'min': 0,
                    'max': 0
                },
                'compassDirection': []
            }
        };
    }
}
