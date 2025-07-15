import { ProfileHeader } from "@/components/spotify/profile-header"
import { NowPlaying } from "@/components/spotify/now-playing"
import { RecentlyPlayed } from "@/components/spotify/recently-played"
import { ListeningStats } from "@/components/spotify/listening-stats"

export default function SpotifyProfile() {
  return (
    <div className="w-full h-full flex flex-col items-center mt-8 sm:mt-12">
      <div className="container flex flex-col justify-start space-y-4 sm:space-y-6 mb-10 w-full max-w-7xl">
        <div data-aos="fade-up" data-aos-duration="2000">
          <ProfileHeader />
        </div>

        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8" data-aos="fade-up" data-aos-duration="2500">
          <NowPlaying />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8" data-aos="fade-up" data-aos-duration="3000">
            <div className="xl:col-span-2 space-y-6 sm:space-y-8" data-aos="fade-up" data-aos-duration="3500">
              <RecentlyPlayed />
            </div>

            <div data-aos="fade-up" data-aos-duration="4000">
              <ListeningStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
