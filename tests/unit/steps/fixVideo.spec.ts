import fixVideo from '../../../src/proxy-page/steps/fixVideo';
import { ContextService } from '../../../src/context/context.service';
import { createModuleRefForStep } from './utils';

const expected =
  `<html><head></head><body><span class="confluence-embedded-file-wrapper image-center-wrapper">` +
  `<video width="400" controls><source src="/cpv/wiki/download/attachments/473006389/DMDG%20SAP%20metadata.mp4?version=1" type="video/mp4"></video>` +
  `<a href="/cpv/wiki/download/attachments/473006389/DMDG%20SAP%20metadata.mp4?version=1">DMDG SAP metadata.mp4</a></span>` +
  `</body></html>`;

describe('ConfluenceProxy / add html5 video tag to visualize video attachment', () => {
  let context: ContextService;

  beforeEach(async () => {
    const moduleRef = await createModuleRefForStep();
    context = moduleRef.get<ContextService>(ContextService);

    context.Init('XXX', '123456', 'dark');
  });

  it('Remove CDATA blocks from Drawio ap-iframe-body-script', () => {
    const step = fixVideo();
    const example =
      `<html><head></head><body><span class="confluence-embedded-file-wrapper image-center-wrapper">` +
      `<a href="/cpv/wiki/download/attachments/473006389/DMDG%20SAP%20metadata.mp4?version=1">DMDG SAP metadata.mp4</a></span>` +
      `</body></html>`;
    context.setHtmlBody(example);
    step(context);
    expect(context.getHtmlBody()).toEqual(expected);
  });
});
