export enum VIDEO_MODE {
  Reference = 1,
  FirstLastFrame = 2
}

export const getVideoModeStr = (type: VIDEO_MODE) => {
  switch (type) {
    case VIDEO_MODE.Reference:
      return 'Reference generation';
    case VIDEO_MODE.FirstLastFrame:
      return 'First & Last frame';
  }
}

export const FRAME_RATE = 24;

export enum VIDEO_DURATION {
  Seconds = 1,
  SmartLength = 2
}

export const getVideoDurationStr = (type: VIDEO_DURATION) => {
  switch (type) {
    case VIDEO_DURATION.Seconds:
      return 'Seconds';
    case VIDEO_DURATION.SmartLength:
      return 'Smart Length';
  }
}

export enum VIDEO_RATIO {
  '21_9' = 1,
  '16_9' = 2,
  '4_3'= 3,
  '1_1'= 4,
  '3_4'= 5,
  '9_16' = 6,
  adaptive = 7,
}

export const getVideoRatioStr = (type: VIDEO_RATIO) => {
  switch (type) {
    case VIDEO_RATIO['21_9']:
      return '21:9';
    case VIDEO_RATIO['16_9']:
      return '16:9';
    case VIDEO_RATIO['4_3']:
      return '4:3';
    case VIDEO_RATIO['1_1']:
      return '1:1';
    case VIDEO_RATIO['3_4']:
      return '3:4';
    case VIDEO_RATIO['9_16']:
      return '9:16';
    case VIDEO_RATIO.adaptive:
      return 'adaptive';
  }
}

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

export enum VIDEO_RESOLUTION {
  '480p' = 1,
  '720p' = 2
}

export const getVideoResolutionStr = (type: VIDEO_RESOLUTION) => {
  switch (type) {
    case VIDEO_RESOLUTION['480p']:
      return '480p';
    case VIDEO_RESOLUTION['720p']:
      return '720p';
  }
}

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
