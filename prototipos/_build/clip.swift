// Trim the AirDrop bathroom walkthrough to a short silent clip + poster frame.
// Usage: swift prototipos/_build/clip.swift <input.mp4> <out.mp4> <poster.jpg> <start> <duration>
import AVFoundation
import AppKit
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let start = CMTime(seconds: Double(a[4])!, preferredTimescale: 600)
let dur = CMTime(seconds: Double(a[5])!, preferredTimescale: 600)
let comp = AVMutableComposition()
let src = asset.tracks(withMediaType: .video)[0]
let track = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try! track.insertTimeRange(CMTimeRange(start: start, duration: dur), of: src, at: .zero)
track.preferredTransform = src.preferredTransform   // no audio track: the clip is silent
let out = URL(fileURLWithPath: a[2]); try? FileManager.default.removeItem(at: out)
let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality)!
ex.outputURL = out; ex.outputFileType = .mp4; ex.shouldOptimizeForNetworkUse = true
let sem = DispatchSemaphore(value: 0); ex.exportAsynchronously { sem.signal() }; sem.wait()
print("export:", ex.status == .completed ? "ok" : "failed \(String(describing: ex.error))")
let g = AVAssetImageGenerator(asset: asset); g.appliesPreferredTrackTransform = true
let cg = try! g.copyCGImage(at: CMTime(seconds: Double(a[4])! + 6, preferredTimescale: 600), actualTime: nil)
try! NSBitmapImageRep(cgImage: cg).representation(using: .jpeg, properties: [.compressionFactor: 0.8])!.write(to: URL(fileURLWithPath: a[3]))
