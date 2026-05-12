export const VideoMode = [
  {
    value: 1,
    label: 'Reference generation'
  },
  {
    value: 2,
    label: 'First & Last frame'
  }
];

export const FRAME_RATE = 24;

export const VideoDuration = [
  {
    value: 1,
    label: 'Seconds'
  },
  {
    value: 2,
    label: 'Smart Length'
  },
];

export const VideoRatio = [
  {
    value: 1,
    label: '21:9'
  },
  {
    value: 2,
    label: 'S16:9'
  },
  {
    value: 3,
    label: '4:3'
  },
  {
    value: 4,
    label: '1:1'
  },
  {
    value: 5,
    label: '3:4'
  },
  {
    value: 6,
    label: '9:16'
  },
  {
    value: 7,
    label: 'adaptive'
  },
];

export const VideoResolution = [
  {
    value: 1,
    label: '480p'
  },
  {
    value: 2,
    label: '720p'
  }
];

export const SEEDANCE_2_FAST_FRAME = {
  '480p': {
    '16:9': [864, 496],
    '4:3': [752, 560],
    '1:1': [640, 640],
    '3:4': [560, 752],
    '9:16': [496, 864],
    '21:9': [992, 432],
  },
  '720p': {
    '16:9': [1280, 720],
    '4:3': [1112, 834],
    '1:1': [960, 960],
    '3:4': [834, 1112],
    '9:16': [720, 1280],
    '21:9': [1470, 630],
  },
};
